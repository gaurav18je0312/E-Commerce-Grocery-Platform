pipeline {
    agent any
    // environment {
    //     GITHUB_TOKEN = credentials('green-basket-github-token')
    // }
    stages {
        stage('Git Clone') {
            agent any
            steps {
                script {
                    withCredentials([string(credentialsId: 'green-basket-github-token', variable: 'TOKEN')]){
                        checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: "https://<GitHubUsername>:${TOKEN}@github.com/gaurav18je0312/Green-Basket.git"]]])
                    }
                }
            }
        }

        stage('Build and test Backend') {
            agent any
            steps {
                script {
                    sh 'python3 -m venv venv'
                    sh '. venv/bin/activate && cd backend && pip install -r requirements.txt'
                    sh '. venv/bin/activate && export DATABASE_NAME=ecommerce && export DATABASE_USER=root && export DATABASE_PASS=root && export DATABASE_HOST=localhost && cd backend && python3 manage.py test'
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
