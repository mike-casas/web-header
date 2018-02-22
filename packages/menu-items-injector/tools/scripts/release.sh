#!/bin/bash -e

# Export RELEASE env var
export RELEASE=1

# Verifies that is running from the right directory
if ! [ -e tools/scripts/release.sh ]; then
  echo >&2 "Please run tools/scripts/release.sh from the repo root"
  exit 1
fi

GIT_BRANCH="master"
PACKAGE_NAME=$(node -p "require('./package').name")
VERSION=$(node -p "require('./package').version")

TAG_NAME="$PACKAGE_NAME@$VERSION"
TAG_EXISTS=$(git tag -l "$TAG_NAME")

if [ ! -z "$TAG_EXISTS" ]; then
  echo "There is already a tag $TAG_EXISTS in git. Skiping git deploy."
else
  echo "Uploading git tag $VERSION"

  git tag $TAG_NAME
  git push origin $TAG_NAME

  echo "Publishing as gitpkg $VERSION"
  $(npm bin)/gitpkg publish
fi

# Publish package to our CDN
$(npm bin)/ccu
