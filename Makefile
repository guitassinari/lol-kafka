
NAMESPACE := kafka

GET_STRIMZI := $(shell echo kubectl get strimzi -n $(NAMESPACE))

destroy:
	kubectl delete pods --all -A
	minikube delete --all
	
start:
	minikube start --memory=4096
	make create_namespaces
	make create_kafka_cluster
	make start_kafka_ui
	make start_tunnel

create_namespaces:
	kubectl apply -f ./local-dev/kubernetes/kafka/namespace.yml

create_kafka_cluster:
ifeq ($(GET_STRIMZI), "No resources found in $(NAMESPACE) namespace.")
	kubectl create -f 'https://strimzi.io/install/latest?namespace=kafka' -n $(NAMESPACE)
endif
	kubectl apply -f ./local-dev/kubernetes/kafka/kafka.yaml -n $(NAMESPACE)
	kubectl wait kafka/lol-kafka-cluster --for=condition=Ready --timeout=300s -n $(NAMESPACE)

start_kafka_ui:
	minikube addons enable ingress
	kubectl apply -f ./local-dev/kubernetes/kafka/ingress.yaml -n $(NAMESPACE)
	kubectl apply -f ./local-dev/kubernetes/kafka/kafka-ui-deployment.yaml -n $(NAMESPACE)
	kubectl apply -f ./local-dev/kubernetes/kafka/kafka-ui-service.yaml -n $(NAMESPACE)

start_tunnel:
	minikube tunnel
