
FROM python:latest
COPY . /app
WORKDIR /app
RUN apt update -y && apt install -y python3-dev build-essential default-libmysqlclient-dev && apt install -y python3-pip
RUN pip3 install -r requirements.txt && pip3 install mysqlclient
EXPOSE 5001
ENTRYPOINT [ "python3" ]
CMD [ "main.py" ]