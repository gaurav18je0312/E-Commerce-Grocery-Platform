FROM python:3

WORKDIR /backend

COPY . .

ENV DATABASE_NAME=ecommerce
ENV DATABASE_USER=root
ENV DATABASE_PASS=root
ENV DATABASE_HOST=db

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]