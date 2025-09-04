pipeline {
    agent any

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
                sh '''
                    node -v
                    npm -v

                    # Install Angular CLI locally (not global)
                    npm install @angular/cli@18 --save-dev
                    npm install
                '''
            }
        }

        stage('Build Angular App') {
            steps {
                sh './node_modules/.bin/ng build --configuration production'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p 80:80 ${IMAGE_NAME}:latest
                '''
            }
        }
    }
}

