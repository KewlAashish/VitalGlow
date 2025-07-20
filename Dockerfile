# Using a python image
FROM python:3.11

# Setting up working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose port
EXPOSE 5000

# Running the application via gunicorn
CMD ["gunicorn", "run:app", "--bind", "0.0.0.0:5000"]