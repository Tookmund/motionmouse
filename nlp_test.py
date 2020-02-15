import spacy

# Load English tokenizer, tagger, parser, NER and word vectors
nlp = spacy.load("en_core_web_sm")

# Process whole documents
#text = ("When Sebastian Thrun started working on self-driving cars at "
        #"Google in 2007, few people outside of the company took him "
        #"seriously. “I can tell you very senior CEOs of major American "
        #"car companies would shake my hand and turn away because I wasn’t "
        #"worth talking to,” said Thrun, in an interview with Recode earlier "
        #"this week.")
#doc = nlp(text)

# Analyze syntax
#print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
#print("Verbs:", [token.lemma_ for token in doc if token.pos_ == "VERB"])

# Find named entities, phrases and concepts
#for entity in doc.ents:
    #print(entity.text, entity.label_)



def user_tokens(text):
    text = input("Enter a command as a string: ")
    doc =  nlp(text)

for token in doc:
    print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,
        token.shape_, token.is_alpha, token.is_stop)

user_tokens(text = "move mouse 5.6 to the left")
