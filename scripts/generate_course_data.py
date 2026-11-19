import json
import re

with open('processed_questions.json', encoding='utf-8') as f:
    questions = json.load(f)

# Define Units metadata
units_meta = [
    {
        'id': 1,
        'code': 'UNIT I',
        'title': 'Introduction to Design Thinking & Empathy Stage',
        'shortTitle': 'Foundations & Empathy',
        'subtitle': 'Human-Centered Problem Solving & Deep User Empathy',
        'description': 'Understand the core mindset of Design Thinking, the iterative 5-stage framework (Empathize, Define, Ideate, Prototype, Test), and comprehensive techniques to develop genuine empathy with end users.',
        'accent': '#E65100',
        'lightAccent': '#FFF3E0',
        'darkAccent': '#FFB74D',
        'icon': 'heart',
        'estimatedRead': '45 mins',
        'keyThemes': ['Human-Centered Design', '5-Stage Iterative Process', 'Deep User Empathy', 'Observation & Immersion', 'Empathy Maps']
    },
    {
        'id': 2,
        'code': 'UNIT II',
        'title': 'Research Methods, User Personas & Problem Definition',
        'shortTitle': 'Research, Personas & Define',
        'subtitle': 'Qualitative & Quantitative Discovery and Point of View Synthesis',
        'description': 'Master user research methodologies, synthesize observations into rich User Personas, articulate Point-of-View (POV) statements, and frame breakthrough "How Might We" (HMW) opportunities.',
        'accent': '#0D47A1',
        'lightAccent': '#E3F2FD',
        'darkAccent': '#64B5F6',
        'icon': 'users',
        'estimatedRead': '55 mins',
        'keyThemes': ['Qualitative vs Quantitative', 'User Personas', 'Empathy Mapping (Says/Thinks/Does/Feels)', 'POV Formula', 'HMW Framing']
    },
    {
        'id': 3,
        'code': 'UNIT III',
        'title': 'Ideation Techniques & Creative Problem Reframing',
        'shortTitle': 'Ideation & Reframing',
        'subtitle': 'Divergent Exploration, SCAMPER, Brainstorming & Mind Mapping',
        'description': 'Unlock expansive creative thinking. Explore structured ideation methods including Brainstorming rules, the SCAMPER operator matrix, Mind Mapping, and deliberate problem reframing to escape orthodoxies.',
        'accent': '#6A1B9A',
        'lightAccent': '#F3E5F5',
        'darkAccent': '#BA68C8',
        'icon': 'lightbulb',
        'estimatedRead': '50 mins',
        'keyThemes': ['Divergent vs Convergent Thinking', 'Brainstorming Protocols', 'SCAMPER Operator Technique', 'Mind Mapping', 'Reframing Orthodoxies']
    },
    {
        'id': 4,
        'code': 'UNIT IV',
        'title': 'Prototyping & Testing Methodologies',
        'shortTitle': 'Prototyping & Testing',
        'subtitle': 'Low-Fi vs High-Fi Artifacts, MVP Validation & User Feedback Cycles',
        'description': 'Translate concepts into tangible experiments. Compare low-fidelity vs high-fidelity prototypes, build Minimum Viable Products (MVPs), execute structured usability testing, and drive iterative refinement.',
        'accent': '#00695C',
        'lightAccent': '#E0F2F1',
        'darkAccent': '#4DB6AC',
        'icon': 'tool',
        'estimatedRead': '60 mins',
        'keyThemes': ['Fidelity Spectrum (Paper to Interactive)', 'Rapid Prototyping', 'Minimum Viable Product (MVP)', 'Usability Testing Labs', 'Feedback Grid Matrix']
    },
    {
        'id': 5,
        'code': 'UNIT V',
        'title': 'Design Thinking for Business, Innovation & Entrepreneurship',
        'shortTitle': 'Business & Innovation',
        'subtitle': 'Strategic Transformation, Scaled Case Studies & Customer Centricity',
        'description': 'Apply Design Thinking across corporate strategy, startup ventures, and organizational transformation. Deep dive into iconic case studies (Airbnb, Apple, GE Healthcare) and sustainable market innovation.',
        'accent': '#C2185B',
        'lightAccent': '#FCE4EC',
        'darkAccent': '#F06292',
        'icon': 'trending-up',
        'estimatedRead': '50 mins',
        'keyThemes': ['Desirability, Feasibility, Viability', 'Airbnb & GE Healthcare Transformations', 'Lean Startup Integration', 'Fail Fast & Pivot', 'Customer-Centric Culture']
    },
    {
        'id': 6,
        'code': 'CAPSTONE (PART C)',
        'title': 'Comprehensive Real-World Design Challenges',
        'shortTitle': 'Capstone Design Challenges',
        'subtitle': 'End-to-End Application: Healthcare Tech & Community Social Impact',
        'description': 'Complete, rigorous, end-to-end demonstrations of the 5-stage Design Thinking lifecycle for complex real-world challenges: Elderly Medication Adherence Mobile Ecosystem & Urban Community Waste Management.',
        'accent': '#1A237E',
        'lightAccent': '#E8EAF6',
        'darkAccent': '#7986CB',
        'icon': 'award',
        'estimatedRead': '65 mins',
        'keyThemes': ['15-Mark Anna University Capstone', 'Elderly Healthcare App Solution', 'Community Smart Waste Management', 'End-to-End Artifacts', 'Systemic Impact']
    }
]

# Enrich each question with key terms, highlights, topic summary
for q in questions:
    text = q['full_text']
    subheadings = []
    for line in q['content_lines']:
        stripped = line.strip()
        if stripped.isupper() and 3 < len(stripped) < 70 and not stripped.startswith('PART'):
            subheadings.append(stripped)
        elif stripped.startswith('STEP ') or stripped.startswith('1. ') or stripped.startswith('2. ') or stripped.startswith('3. ') or stripped.startswith('4. ') or stripped.startswith('5. '):
            if len(stripped) < 80:
                subheadings.append(stripped)
    q['subheadings'] = subheadings[:12]
    
    words = re.findall(r'[A-Za-z\-]{4,}', text)
    stopwords = {'this', 'that', 'with', 'from', 'they', 'their', 'them', 'have', 'were', 'been', 'which', 'what', 'when', 'where', 'will', 'would', 'could', 'should', 'about', 'more', 'some', 'other', 'into', 'only', 'also', 'most', 'very', 'than', 'after', 'before'}
    freq = {}
    for w in words:
        w_l = w.lower()
        if w_l not in stopwords:
            freq[w_l] = freq.get(w_l, 0) + 1
    
    top_keywords = sorted(freq.items(), key=lambda x: x[1], reverse=True)[:8]
    q['keywords'] = [k[0] for k in top_keywords]

final_data = {
    'subject': {
        'code': 'OME354',
        'name': 'Applied Design Thinking',
        'institution': 'Anna University Regulation Curriculum',
        'description': 'Comprehensive exam preparation and visual learning platform covering the entire Anna University OME354 curriculum across all Units, Part A (2 Marks), Part B (13 Marks), and Part C (15 Marks) comprehensive design cases.',
        'examPattern': {
            'partA': '10 Questions × 2 Marks = 20 Marks (No choice, tests fundamental definitions & concepts)',
            'partB': '5 Questions (Either/Or) × 13 Marks = 65 Marks (Comprehensive conceptual & analytical questions across 5 units)',
            'partC': '1 Question (Either/Or) × 15 Marks = 15 Marks (Application-oriented comprehensive case study/scenario problem)'
        }
    },
    'units': units_meta,
    'questions': questions
}

with open('data/courseData.js', 'w', encoding='utf-8') as f:
    f.write('window.COURSE_DATA = ' + json.dumps(final_data, ensure_ascii=False, indent=2) + ';')

print('data/courseData.js written successfully! File size:', len(open('data/courseData.js', encoding='utf-8').read()))
