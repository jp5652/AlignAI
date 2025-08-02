#!/usr/bin/env python3
"""
Script to populate the database with interview templates
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal, InterviewTemplate
import json

# Interview templates data
templates_data = [
    # Software Engineering
    {
        "category": "Software",
        "subcategory": "New Grad E3: Technical interview #1",
        "title": "Software Engineering",
        "description": "Comprehensive technical interview covering algorithms, data structures, and system design",
        "duration": 20,
        "difficulty": "Medium",
        "questions": json.dumps([
            "Tell me about yourself and your background in software engineering",
            "What programming languages are you most comfortable with?",
            "Explain the difference between a stack and a queue",
            "How would you implement a hash table?",
            "Describe a challenging project you've worked on"
        ])
    },
    {
        "category": "Software",
        "subcategory": "Stacks vs Queues",
        "title": "Stacks vs Queues",
        "description": "Learn the FIFO and LIFO flows",
        "duration": 5,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What is the difference between a stack and a queue?",
            "When would you use a stack vs a queue?",
            "How would you implement a stack using an array?",
            "What are some real-world applications of stacks and queues?"
        ])
    },
    {
        "category": "Software",
        "subcategory": "MVC Models",
        "title": "MVC Models",
        "description": "Explain this core design architecture",
        "duration": 5,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What is the MVC pattern?",
            "What are the responsibilities of each component?",
            "What are the benefits of using MVC?",
            "How would you implement MVC in a web application?"
        ])
    },
    {
        "category": "Software",
        "subcategory": "REST API 101",
        "title": "REST API 101",
        "description": "Web APIs using HTTP methods",
        "duration": 5,
        "difficulty": "Easy",
        "questions": json.dumps([
            "What is REST?",
            "What are the main HTTP methods?",
            "What is the difference between GET and POST?",
            "How would you design a RESTful API for a blog?"
        ])
    },
    {
        "category": "Software",
        "subcategory": "Processes vs Threads",
        "title": "Processes vs Threads",
        "description": "Discuss these Core OS concepts",
        "duration": 5,
        "difficulty": "Easy",
        "questions": json.dumps([
            "What is the difference between a process and a thread?",
            "What are the advantages of using threads?",
            "What is thread safety?",
            "How do processes communicate with each other?"
        ])
    },

    # Data Science
    {
        "category": "Data Science",
        "subcategory": "Deep Learning Intro",
        "title": "Deep Learning Intro",
        "description": "Review neural networks and deep learning",
        "duration": 35,
        "difficulty": "Difficult",
        "questions": json.dumps([
            "What is deep learning and how does it differ from traditional machine learning?",
            "Explain the concept of backpropagation",
            "What are the different types of neural network layers?",
            "How do you prevent overfitting in neural networks?"
        ])
    },
    {
        "category": "Data Science",
        "subcategory": "A/B Testing Basics",
        "title": "A/B Testing Basics",
        "description": "Talk about A/B testing and experiment design",
        "duration": 30,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What is A/B testing?",
            "How do you determine sample size for an A/B test?",
            "What are the common pitfalls in A/B testing?",
            "How do you measure statistical significance?"
        ])
    },
    {
        "category": "Data Science",
        "subcategory": "Data Cleaning Tips",
        "title": "Data Cleaning Tips",
        "description": "Discuss data cleaning and preprocessing",
        "duration": 25,
        "difficulty": "Easy",
        "questions": json.dumps([
            "What are the common data quality issues?",
            "How do you handle missing values?",
            "What techniques do you use for outlier detection?",
            "How do you ensure data consistency?"
        ])
    },
    {
        "category": "Data Science",
        "subcategory": "Time Series Basics",
        "title": "Time Series Basics",
        "description": "Explore time series data and forecasting",
        "duration": 30,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What is time series analysis?",
            "What are the components of a time series?",
            "How do you handle seasonality in time series data?",
            "What forecasting methods are you familiar with?"
        ])
    },
    {
        "category": "Data Science",
        "subcategory": "Big Data Concepts",
        "title": "Big Data Concepts",
        "description": "Discuss big data tools and ecosystems",
        "duration": 35,
        "difficulty": "Difficult",
        "questions": json.dumps([
            "What is big data and what are the 3 V's?",
            "What is MapReduce and how does it work?",
            "What are the differences between Hadoop and Spark?",
            "How do you handle data partitioning in distributed systems?"
        ])
    },

    # Finance
    {
        "category": "Finance",
        "subcategory": "Behavioral Finance",
        "title": "Behavioral Finance",
        "description": "Explore psychology in financial decisions",
        "duration": 30,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What is behavioral finance?",
            "What are some common cognitive biases in investing?",
            "How does herd behavior affect markets?",
            "What is prospect theory?"
        ])
    },
    {
        "category": "Finance",
        "subcategory": "Portfolio Management",
        "title": "Portfolio Management",
        "description": "Review portfolio management strategies",
        "duration": 30,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What is modern portfolio theory?",
            "How do you measure portfolio risk?",
            "What is the efficient frontier?",
            "How do you rebalance a portfolio?"
        ])
    },
    {
        "category": "Finance",
        "subcategory": "Risk Management",
        "title": "Risk Management",
        "description": "Explore strategies for risk assessment",
        "duration": 35,
        "difficulty": "Difficult",
        "questions": json.dumps([
            "What are the different types of financial risk?",
            "How do you calculate Value at Risk (VaR)?",
            "What is stress testing?",
            "How do you manage credit risk?"
        ])
    },
    {
        "category": "Finance",
        "subcategory": "Excel for Finance",
        "title": "Excel for Finance",
        "description": "Discuss Excel skills for finance tasks",
        "duration": 30,
        "difficulty": "Easy",
        "questions": json.dumps([
            "What Excel functions are most useful for financial modeling?",
            "How do you create a discounted cash flow model in Excel?",
            "What are some advanced Excel techniques for finance?",
            "How do you use Excel for scenario analysis?"
        ])
    },
    {
        "category": "Finance",
        "subcategory": "Market Trends",
        "title": "Market Trends",
        "description": "Discuss current market trends and impacts",
        "duration": 30,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What are the current trends in the financial markets?",
            "How do you analyze market sentiment?",
            "What factors influence market volatility?",
            "How do you stay updated with market developments?"
        ])
    },

    # Consulting
    {
        "category": "Consulting",
        "subcategory": "Consulting Case Interview #1",
        "title": "Consulting Case Interview",
        "description": "Help a client analyze the launch of a new sports beverage",
        "duration": 20,
        "difficulty": "Medium",
        "questions": json.dumps([
            "How would you approach this case?",
            "What information would you need to gather?",
            "What are the key factors to consider?",
            "What would be your recommendation?"
        ])
    },
    {
        "category": "Consulting",
        "subcategory": "Consulting Case Interview #2",
        "title": "Consulting Case Interview",
        "description": "Explore solutions for a travel agency's overloaded call center",
        "duration": 10,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What is the root cause of the problem?",
            "What are the potential solutions?",
            "How would you evaluate the options?",
            "What is your implementation plan?"
        ])
    },
    {
        "category": "Consulting",
        "subcategory": "Consulting Case Interview #3",
        "title": "Consulting Case Interview",
        "description": "Help a client improve profitability",
        "duration": 30,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What is the current situation?",
            "What are the drivers of profitability?",
            "What opportunities do you see?",
            "What is your strategic recommendation?"
        ])
    },

    # Business
    {
        "category": "Business",
        "subcategory": "New Product Launch",
        "title": "New Product Launch",
        "description": "Plan and strategize a product launch",
        "duration": 30,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What are the key components of a product launch strategy?",
            "How do you identify your target market?",
            "What marketing channels would you use?",
            "How do you measure launch success?"
        ])
    },
    {
        "category": "Business",
        "subcategory": "Risk Assessment Case",
        "title": "Risk Assessment Case",
        "description": "Evaluate risks in a business plan",
        "duration": 30,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What are the main risks in this business plan?",
            "How would you prioritize these risks?",
            "What mitigation strategies would you recommend?",
            "How do you monitor risk over time?"
        ])
    },
    {
        "category": "Business",
        "subcategory": "Digital Transformation",
        "title": "Digital Transformation",
        "description": "Guide a firm through digital change",
        "duration": 30,
        "difficulty": "Easy",
        "questions": json.dumps([
            "What is digital transformation?",
            "What are the key challenges in digital transformation?",
            "How do you manage change resistance?",
            "What is your approach to digital strategy?"
        ])
    },
    {
        "category": "Business",
        "subcategory": "Business Model Evaluation",
        "title": "Business Model Evaluation",
        "description": "Assess the viability of a business model",
        "duration": 25,
        "difficulty": "Difficult",
        "questions": json.dumps([
            "What are the key components of this business model?",
            "What are the revenue streams?",
            "What are the cost drivers?",
            "How sustainable is this model?"
        ])
    },

    # Product
    {
        "category": "Product",
        "subcategory": "Agile Methodologies",
        "title": "Agile Methodologies",
        "description": "Explore agile practices for product teams",
        "duration": 30,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What is Agile methodology?",
            "What are the key principles of Agile?",
            "How do you run a sprint planning session?",
            "What are the benefits of Agile over Waterfall?"
        ])
    },
    {
        "category": "Product",
        "subcategory": "Go-to-Market Plan",
        "title": "Go-to-Market Plan",
        "description": "Discuss strategies for launching products",
        "duration": 20,
        "difficulty": "Easy",
        "questions": json.dumps([
            "What is a go-to-market strategy?",
            "What are the key components of a GTM plan?",
            "How do you identify your target audience?",
            "What channels would you use to reach customers?"
        ])
    },
    {
        "category": "Product",
        "subcategory": "Product Lifecycle 101",
        "title": "Product Lifecycle 101",
        "description": "Review stages of product lifecycle",
        "duration": 30,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What are the stages of the product lifecycle?",
            "How do you manage a product through different stages?",
            "What metrics do you track at each stage?",
            "How do you decide when to retire a product?"
        ])
    },
    {
        "category": "Product",
        "subcategory": "Metrics and KPIs",
        "title": "Metrics and KPIs",
        "description": "Explore key metrics for product success",
        "duration": 30,
        "difficulty": "Medium",
        "questions": json.dumps([
            "What are the most important product metrics?",
            "How do you measure user engagement?",
            "What is the difference between leading and lagging indicators?",
            "How do you set up a metrics dashboard?"
        ])
    },

    # Add more templates for other categories...
]

def populate_templates():
    """Populate the database with interview templates"""
    db = SessionLocal()
    
    try:
        # Clear existing templates
        db.query(InterviewTemplate).delete()
        db.commit()
        
        # Add new templates
        for template_data in templates_data:
            template = InterviewTemplate(**template_data)
            db.add(template)
        
        db.commit()
        print(f"Successfully added {len(templates_data)} interview templates")
        
    except Exception as e:
        print(f"Error populating templates: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    populate_templates()