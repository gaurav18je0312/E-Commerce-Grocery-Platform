pipeline {
    agent none

    stages {
        stage('Git Clone') {
            agent any
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/gaurav18je0312/Green-Basket.git']]])
            }
        }

        stage('Build and Run Frontend') {
            agent any
            steps {
                script {
                    sh 'cd frontend && npm install vite'
                    sh 'cd frontend && npm run dev &'
                }
            }
        }

        stage('Build and Run Backend') {
            agent any
            steps {
                script {
                    sh 'python3 -m venv venv'
                    sh 'source venv/bin/activate'
                    sh 'cd backend && pip install -r requirements.txt && python3 manage.py runserver &'
                }
            }
        }

        // Add more stages for additional steps such as testing and deployment

        stage('Cleanup') {
            agent any
            steps {
                script {
                    // Stop and remove the container
                    sh 'exit'
                }
                deleteDir()
            }
        }
    }
}
