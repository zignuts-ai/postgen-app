pipeline {
  agent any
  environment {
    INSTANCE_IP = '3.111.22.91'
  }
  stages {
    stage('Deploy'){
            steps {
                echo 'Deployment'
                sshagent(credentials: ['zignuts-genai-hackathon-server']) {
                  sh '''
                    ssh -o StrictHostKeyChecking=no 'github-actions'@${INSTANCE_IP} sh /apps/scripts/deploy-frontend.sh
                    '''
                }
            }
    }
  }
  post {
        always {
            cleanWs()
        }
    }
}