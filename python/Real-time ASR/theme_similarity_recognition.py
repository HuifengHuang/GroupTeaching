from sentence_transformers import SentenceTransformer
import numpy as np


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


class ThemeModel:
    def __init__(self):
        self.model = SentenceTransformer('../m3e-base')
        self.theme = ["可视化与可视分析"]

    def theme_similarity_recognition(self, sentence):
        embeddings_theme = self.model.encode(self.theme)
        embeddings_sentence = self.model.encode(sentence)
        similarity = cosine_similarity(embeddings_sentence, embeddings_theme)
        print(embeddings_sentence + "的主题相似度为:" + similarity)
        return similarity
