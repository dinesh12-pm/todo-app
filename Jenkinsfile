pipeline {
    agent any

    tools {
        nodejs "NodeJS-20"
    }

    environment {
        APP_NAME = "todo-app"
        IMAGE_NAME = "todo-app-image"
        CONTAINER_NAME = "todo-app-container"
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/dinesh12-pm/todo-app.git'
                )
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install -g @angular/cli'
                sh 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Stop and remove any existing container
                    sh """
                        docker ps -q --filter "name=${CONTAINER_NAME}" | grep -q . && docker stop ${CONTAINER_NAME} && docker rm ${CONTAINER_NAME} || true
                    """

                    // Run a fresh container
                    sh """
                        docker run -d -p 8080:80 --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Angular app built and running inside Docker at http://<EC2-Public-IP>:8080"
        }
        failure {
            echo "❌ Pipeline failed. Check Jenkins logs."
        }
    }
}

