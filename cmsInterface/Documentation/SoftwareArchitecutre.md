# How ConsciusCMS Works at the Software Level  

ConsciusCMS is designed with a **simple yet solid architecture**, built on principles of modularity, standardization, and scalability. Each part of the system has a clear role and integrates into a seamless flow that goes from user interaction to data persistence in the cloud.  

## 1. Main Components  

### React Component (user interface)  
Each part of the website is developed as a reusable React component. Users can interact with them both to **view** and **edit** content.  

### Redux Slice (state and actions)  
Each React component is paired with a **Redux slice** that defines the **state** and **actions**. This ensures predictable, traceable, and testable data management.  

### Services (business logic and cloud communication)  
Services encapsulate communication with AWS infrastructure. Their role is to retrieve, save, or update information through the serverless stack:  
- **CloudFront**: content distribution.  
- **API Gateway**: entry point for requests.  
- **Lambda**: functions executing business logic.  
- **DynamoDB**: serverless database for pages, schemas, and settings.  

### Standardized CSS (styles)  
Each component includes a CSS class for styling. A **unified set of templates, variables, and conventions** is used, ensuring visual consistency and making customization straightforward.  

## 2. Simplified Workflow  

1. The user accesses the frontend served by **CloudFront**.  
2. After login, **Cognito** authenticates the user and issues a token.  
3. The frontend (React + Redux) communicates with **API Gateway**.  
4. API Gateway validates the token and triggers the corresponding **Lambda**.  
5. Lambda manages data in **DynamoDB** or files in **S3**.  
6. The result is returned to the frontend, which updates the UI through Redux.  

## 3. Advantages of this Architecture  

- **Automatic scalability** thanks to the serverless approach.  
- **Clear separation of concerns**: UI (React), state (Redux), services (AWS).  
- **Consistent styling** via CSS standards.  
- **Flexibility** to create or extend components without compromising the core.  
- **Productivity and agility** with continuous deployments in minutes (CI/CD with GitHub Actions).  