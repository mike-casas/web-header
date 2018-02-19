pipeline {
  agent any

  tools {
    nodejs 'node-v8.9.4'
  }

  environment {
    // Node.js and npm
    NODE_ENV = 'production'
    NPM_CONFIG_PRODUCTION = 'false'
  }

  stages {
    stage('slack start') {
      steps {
        slackSend channel: '#web-header',
                  color: 'good',
                  message: "${currentBuild.fullDisplayName} started. (<${env.BUILD_URL}|Open>)"
      }
    }

    stage('log') {
      steps {
        sh 'npm -v'
        sh 'yarn --version'
        sh 'node -v'
      }
    }

    stage('install') {
      steps {
        sh 'yarn install'
      }
    }

    stage('test') {
      steps {
        sh 'yarn test'
      }
    }
  }

  post {
    // Always runs. And it runs before any of the other post conditions.
    always {
      // Let's wipe out the workspace before we finish!
      deleteDir()
    }

    success {
      slackSend channel: '#web-header',
                color: 'good',
                message: "${currentBuild.fullDisplayName} completed successfully. (<${env.BUILD_URL}|Open>)"
    }

    aborted {
      slackSend channel: '#web-header',
                color: 'warning',
                message: "${currentBuild.fullDisplayName} aborted. (<${env.BUILD_URL}|Open>)"
    }

    unstable {
      slackSend channel: '#web-header',
                color: 'warning',
                message: "${currentBuild.fullDisplayName} unstable. (<${env.BUILD_URL}|Open>)"
    }

    failure {
      slackSend channel: '#web-header',
                color: 'danger',
                message: "${currentBuild.fullDisplayName} has failed. (<${env.BUILD_URL}|Open>)"
    }
  }

  // The options directive is for configuration that applies to the whole job.
  options {
    // For example, we'd like to make sure we only keep 20 builds at a time, so
    // we don't fill up our storage!
    buildDiscarder(logRotator(numToKeepStr:'20'))

    // And we'd really like to be sure that this build doesn't hang forever, so
    // let's time it out after half an hour.
    timeout(time: 30, unit: 'MINUTES')
  }
}
