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
                    sh """
                    if [ \$(docker ps -q -f name=${CONTAINER_NAME}) ]; then
                        docker stop ${CONTAINER_NAME} && docker rm ${CONTAINER_NAME}
                    fi
                    docker run -d --name ${CONTAINER_NAME} -p 80:80 ${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }
}

