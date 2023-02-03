node {
    stage('clone git repo') {
        git 'https://github.com/ankushk1729/test-node-docker-jenkins.git'
    }

    stage('build docker image') {
        docker build -t ankushk1729/test-node-docker-jenkins .
    }

    stage('Run docker image') {
        docker run -p 3000:3000 test-node-docker-jenkins
    }
}
