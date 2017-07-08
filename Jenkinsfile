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
                bat 'node "C:\Users\marten\code\aws\minuapp\app\app.js""'
            }  
   
        stage('Test') {
            steps {
                bat 'py.test --junitxml tests/results.xml tests/trial.py'
            }
                      }
            }   
			}
    post {
        always {
            junit 'tests/results.xml'
        }
         }
}