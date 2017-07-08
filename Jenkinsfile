pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                bat 'echo really not building anything'
            }
        }
        stage('Deploy to test') {
            steps {
                bat 'echo deploying'
            }  
                              }
        stage('Test') {
            steps {
                bat 'py.test --junitxml tests/results.xml tests/trial.py'
            }
                      }
     stage('Sanity check') {
            steps {
                input "Does the staging environment look ok?"
            }
        }

        stage('Deploy - Production') {
            steps {
                bat 'echo deploy to live'
            }
        }
            }   
    post {
        always {
            junit 'tests/results.xml'
        }
         }
}