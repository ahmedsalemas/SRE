pipeline {
    agent any  // This means the pipeline can run on any available agent.

    environment {               // Define environment variables for the pipeline
        IMAGE_NAME = "ahmedmasalem/devops-dummy-api"    // The name of the Docker image to be built and pushed
        IMAGE_TAG  = "${env.GIT_COMMIT.take(7)}"    // Use the first 7 characters of the Git commit hash as the image tag
    }

    stages {
        stage('Build') {
            steps {
                dir('api') {  // Change the working directory to 'api' where the Dockerfile is located
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Test') {
            steps {
                dir('api') {
                    withEnv([
                        'DB_HOST=host.docker.internal',
                        'DB_PORT=5432',
                        'DB_USER=devops',
                        'DB_PASSWORD=devops',
                        'DB_NAME=devops_app'
                    ]) {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Scan') {
            steps {
                sh "trivy image --severity HIGH,CRITICAL --exit-code 1 --ignorefile .trivyignore ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Update Manifest') {
            steps {
                echo "Would update k8s manifest repo with new tag: ${IMAGE_TAG}"
                // Real implementation: git clone manifest repo, sed the image tag,
                // commit, push — this is what Phase 13's GitOps controller then
                // picks up automatically.
            }
        }
    }
}