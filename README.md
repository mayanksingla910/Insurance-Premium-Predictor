# Insurest 🛡️💰  


---

## **Overview**  

**Insurest** is a web application that helps users **estimate insurance premiums** using a simple, interactive form. It leverages **machine learning (XGBoost)** for accurate predictions and includes a **BMI calculator** for users who may not know their body metrics.  
Designed for individuals seeking quick insurance insights and scalable for companies looking to integrate insurance prediction for their customers.  

---

## **Features**  

- **Insurance Premium Prediction** – Accurate estimates with minimal input.  
- **Built-in BMI Calculator** – Calculate BMI directly in the app.  
- **Interactive Dashboard** – Smooth micro-interactions for enhanced UX.  
- **Machine Learning-powered** – Uses XGBoost for premium estimation.  
- **CI/CD Pipelines** – Ensures reliable deployment and model updates.  

---

## **Tech Stack**  

- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion, ShadCN UI, Axios  
- **Backend:** Flask, Python  
- **Machine Learning:** XGBoost, scikit-learn, pandas, numpy  
- **Deployment:** Frontend on Vercel, Backend on Render  

---

## **Installation & Setup**  

**Backend**  

```bash
cd backend
pip install -r requirements.txt
python app.py
```
**Frontend**  

```bash
cd frontend
npm install
npm run dev
```
> Make sure Python, Node.js, and npm are installed. Configure environment variables if required.

## Usage

1. Open the app in your browser.  
2. Fill out the insurance form to get a premium estimate.  
3. Use the BMI calculator if your body metrics are unknown.  
4. Enjoy real-time updates and interactive feedback.  


## ML Model & Dataset

- Dataset sourced from **Kaggle**.  
- **XGBoost** used for premium predictions.  
- CI/CD pipelines ensure model stays updated and accurate.  

## Contributing

Contributions are welcome!  

1. Fork the repository.  
2. Create a new branch for your feature or fix.  
3. Submit a pull request with a detailed description.  

## License

MIT License (recommended for maximum adoption).  

## Roadmap / Future Improvements

- **Homepage** – Introductory landing page for the app.  
- **User Authentication** – Sign-up/login for personalized experience.  
- **Company Dashboard** – Allow companies to integrate the model for their customers.  
- **Enhanced Analytics** – Provide insights and visualizations based on user inputs.  

## Contact / Support

Reach out via the [GitHub repository](https://github.com/mayanksingla910/insurest) for issues or queries.  
