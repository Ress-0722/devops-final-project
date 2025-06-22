pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "yourdockerhubusername/devops-task-manager"
        DOCKER_REGISTRY = "docker.io"  // Change this if you're using a different registry
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
                }
            }
        }

        stage('Test Docker Image') {
            steps {
                script {
                    // Run the Docker image locally to make sure everything works
                    sh 'docker run -d -p 8080:80 $DOCKER_IMAGE:$DOCKER_TAG'
                    sleep 5
                    sh 'curl -f http://localhost:8080'  // Simple health check
                    sh 'docker stop $(docker ps -q)'    // Stop the container
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                    }

                    // Push the Docker image
                    sh "docker push $DOCKER_IMAGE:$DOCKER_TAG"
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    // Pull the image and deploy the container
                    sh "docker pull $DOCKER_IMAGE:$DOCKER_TAG"
                    sh "docker run -d -p 8080:80 $DOCKER_IMAGE:$DOCKER_TAG"
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Clean up workspace after each run
        }

        success {
            echo "Pipeline completed successfully!"
        }

        failure {
            echo "Pipeline failed. Please check the logs."
        }
    }
}
