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
            }   
    post {
        always {
            junit 'tests/results.xml'
        }
         }
}