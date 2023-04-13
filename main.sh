#!/bin/bash

# Obtém a lista de projetos da organização e itera sobre cada um
for PROJECT_ID in $(gcloud projects list --format="value(project_id)")
do
  echo "Excluindo todas as versões sem tráfego do projeto $PROJECT_ID ..."

  # Lista todas as versões do App Engine sem tráfego e itera sobre cada uma para excluir
  for VERSION_ID in $(gcloud app versions list --project $PROJECT_ID --filter="traffic_split = 0" --format="value(id)")
  do
    echo "Excluindo a versão $VERSION_ID ..."
    gcloud app versions delete $VERSION_ID --project $PROJECT_ID --quiet
  done

  echo "Todas as versões sem tráfego do projeto $PROJECT_ID foram excluídas com sucesso."
done
