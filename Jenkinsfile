pipeline {
    agent any
    stages {
        stage('Git Clone') {
            agent any
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'gittoken', url: 'https://github.com/gaurav18je0312/Green-Basket.git']])
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
    }
    post {
        always{
            deleteDir()
        }
        success {
            echo 'Build successful'
            emailext (
                body: "Build Number: ${currentBuild.number}\n",
                recipientProviders: [culprits()],
                subject: 'Build Success',
                to: 'gaurav.aggarwal@beehyv.com'
            )
        }
        failure {
            echo 'Build failed'
            emailext (
                body: "Build Number: ${currentBuild.number}\n",
                recipientProviders: [culprits()],
                subject: 'Build Failure',
                to: 'gaurav.aggarwal@beehyv.com'
            )
        }
    }
}