# Use the official Python image as a base image
FROM python:3.9

# Set environment variables for Python and unbuffered mode
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the project files into the container
COPY . /app/

# Expose the port that Django will run on
EXPOSE 8000

# Command to run your application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "caseBackend.wsgi:application"]
