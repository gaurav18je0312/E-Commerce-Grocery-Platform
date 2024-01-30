pipeline {
    agent any

    stages {
        stage('Git Clone') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/gaurav18je0312/Green-Basket.git']]])
            }
        }

        stage('Build and Run Frontend') {
            steps {
                script {
                    sh 'cd frontend && npm install vite@5.0.1'
                    sh 'npm start dev'
                }
            }
        }

        stage('Build and Run Backend') {

            steps {
                script {
                    sh 'source venv/bin/activate'
                    sh 'cd backend && python3 manage.py runserver'
                }
            }
        }

        // Add more stages for additional steps such as testing and deployment

        stage('Cleanup') {
            steps {
                script {
                    // Stop and remove the container
                    sh 'sudo docker compose down'
                    deleteDir()
                }
            }
        }
    }
}
