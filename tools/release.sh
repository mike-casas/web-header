#!/bin/bash -e
#
# Auth0 Web Header release script

# Export RELEASE env var
export RELEASE=1

# Verifies that is running from the right directory
if ! [ -e tools/release.sh ]; then
  echo >&2 "Please run tools/release.sh from the repo root"
  exit 1
fi


# Checks if a npm user can publish a new versions of a package
can_publish_npm() {
  if npm owner ls ${2} | grep -q "${1} "; then
    echo "User ${1} can publish new versions of the npm package ${2}"
  else
    echo "User ${1} isn't allowed to publish new versions of the npm package ${2}"
    exit 1
  fi
}

# Checks if actual npm user can publish a new package version
NPM_USER=$(npm whoami)
PACKAGE_NAME=$(node -p "require('./package').name")
can_publish_npm $NPM_USER $PACKAGE_NAME


# Update menu-items.json
if [ "$UPDATE_MENU_ITEMS" = true ]; then
  {
    echo "Updating menu items highlights"
    # Update menu-items.json
    npm run data
    # Commit update
    git add src/data/menu-items.json
    git commit -m "Update highlights"
  } || {
    echo "Menu items highlights are already updated"
    exit 1
  }
fi


# Bump version in package.json
VERSION=$(node -p "require('./package').version")

if [ "$UPDATE_MENU_ITEMS" = true ]; then
  # Increment semver patch
  $(npm bin)/bump patch

  # Get new version
  VERSION=$(node -p "require('./package').version")
fi


# Add changelog entry
CHANGELOG_ENTRY="$VERSION"
CHANGELOG_EXISTS=$(cat CHANGELOG.md | grep "## $CHANGELOG_ENTRY (")

if [ ! -z "$CHANGELOG_EXISTS" ]; then
  echo "There is already a changelog entry $CHANGELOG_EXISTS in CHANGELOG.md. Skiping changelog entry publish."
else
  echo "Deploying $CHANGELOG_ENTRY changelog entry to CHANGELOG.md"
  # Update CHANGELOG.md
  $(npm bin)/conventional-changelog -i CHANGELOG.md -s

  # Commit change of version and changelog changes
  git checkout master
  git add CHANGELOG.md package.json
  git commit -m "Release $VERSION"

  # Push first to make sure we're up-to-date
  git remote add origin git@github.com:auth0/web-header.git
  git push origin master
fi


# Publish git tag
TAG_NAME="$VERSION"
TAG_EXISTS=$(git tag -l "$TAG_NAME")

if [ ! -z "$TAG_EXISTS" ]; then
  echo "There is already a tag $TAG_EXISTS in git. Skiping git deploy."
else
  echo "Deploying $VERSION to git"

  git tag $VERSION
  git tag latest -f

  git push origin $VERSION
  git push origin latest -f
fi


# Publish package to npm (npm-script prepublish builds Web Header)
NPM_EXISTS=$(npm info $PACKAGE_NAME@$VERSION)

if [ ! -z "$NPM_EXISTS" ]; then
  echo "There is already a version $VERSION in npm. Skiping npm publish."
else
  echo "Deploying $VERSION to npm"
  npm publish
fi


# Publish to cdn (only works on jenkins)
CDN_EXISTS=$(curl -s -o /dev/null -w "%{http_code}" https://cdn.auth0.com/web-header/$VERSION/web-header.css | grep 200 || true)

if [ ! -z "$CDN_EXISTS" ]; then
  echo "There is already a version $VERSION in the CDN. Skiping cdn publish."
else
  echo "Deploying $VERSION to cdn"
  $(npm bin)/grunt cdn
fi
