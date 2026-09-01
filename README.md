# Financial loan services - Personal Loan Website

A minimal, professional personal banking loan website built with HTML, CSS, and JavaScript.

## Features
- Professional responsive landing page
- Hero section with trust highlights
- Loan benefit cards
- EMI calculator (frontend)
- Loan request form that sends details to email via FormSubmit
- Clean footer and branded visual theme

## Run Locally
1. Open the folder in VS Code.
2. Open `index.html` directly in your browser.

Optional local server:
1. If you have Node.js, run:
   - `npx serve .`
2. Open the URL shown in your terminal.

## Notes
- Form submissions are now sent through the Cloudflare Pages Function endpoint at `/api/submit`.
- Set `FORM_SUBMIT_TO_EMAIL` in Cloudflare Pages environment variables to your receiver email.
- The first submission may trigger a FormSubmit activation email to that receiver address.
  Confirm it once before regular form emails are delivered.
- Update brand text, rates, and legal content before production use.

## Cloudflare Pages Environment Setup
1. Open Cloudflare dashboard and go to Workers & Pages -> your project.
2. Go to Settings -> Variables and Secrets.
3. Add environment variable:
   - Key: `FORM_SUBMIT_TO_EMAIL`
   - Value: your target receiver email address
4. Save and redeploy the project.

---

## 👨‍💻 Professional Summary

I am an **AI/ML Engineer** focused on designing **scalable, reliable, and explainable AI systems**. My expertise lies at the intersection of **Machine Learning, NLP, and Production Engineering**. I specialize in turning fragmented, real-world data into high-performance systems that solve complex enterprise challenges.

> *I believe great AI is built on system design, data integrity, and rigorous evaluation — not just model size.*

---

## 🛠️ Technical Expertise

### 🧠 Machine & Deep Learning
- **Classical ML:** Regression, Classification, Clustering, PCA  
- **Deep Learning:** CNNs (vision), LSTMs/RNNs (time series)  
- **Frameworks:** PyTorch, TensorFlow, Scikit-Learn  
- **Evaluation:** Error analysis, cross-validation, relevant metrics

### ✍️ NLP & Generative AI
- **NLP:** Transformers, NER, sentiment analysis, tokenization  
- **LLMs:** GPT-4, Llama 3.3, Claude, Mistral  
- **RAG:** Semantic search, hybrid retrieval, FAISS, ChromaDB,Qdrant
- **Agents:** LangGraph, LangChain, LangChain, tool-use patterns, self-correction

### 📊 Data Engineering
- **Analysis:** Pandas, NumPy, advanced EDA, Seaborn  
- **Databases:** PostgreSQL, MongoDB, vector stores  
- **Pipelines:** Automated data cleaning & ETL

### ⚙️ MLOps & Deployment
- **API & UI:** FastAPI, Streamlit, Flask  
- **Infrastructure:** Docker, Git, CI/CD pipelines  
- **Optimization & Inference:** Groq (LPU), vLLM, inference latency tuning

---
## 🤝 Let's Connect

I'm always open to interesting conversations and collaboration opportunities!

- 💼 [LinkedIn](your-linkedin-url)
- 📧 **Email:** mraghavendra.2005@gmail.com


---
