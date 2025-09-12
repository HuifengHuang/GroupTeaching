from typing import List, Dict, Union
from sentence_transformers import SentenceTransformer
import numpy as np
from itertools import combinations
from readFile import analyze_discussion, extract_contents

model = SentenceTransformer('./m3e-base')

# 读取txt文件内容
file_path = "/home/dengcx/tomtest/xcx/dataset/filiterdata/G1.txt"  # 替换为您的文件路径
data, stats = analyze_discussion(file_path)
data2 = extract_contents(data)

# 新增的相似度计算部分


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


embeddings = model.encode(data2)
test = model.encode("哈哈哈")


def vector_similarity(
    vectors: Union[List[np.ndarray], np.ndarray],
    target: np.ndarray,
    epsilon: float = 1e-8  # 防止除以零的小量
) -> List[Dict[str, Union[int, float, np.ndarray]]]:
    """
    计算一组向量与目标向量的余弦相似度

    参数:
    vectors : 待比较向量组 (N个D维向量)
    target : 目标向量 (D维)
    epsilon : 数值稳定系数

    返回:
    按相似度降序排列的结果列表，每个元素包含：
    {
        "index": 原始索引,
        "similarity": 余弦相似度,
        "vector": 原始向量
    }

    示例:
    >>> vecs = [np.array([1,0]), np.array([0,1])]
    >>> target = np.array([1,1])
    >>> results = vector_similarity(vecs, target)
    >>> print(results[0]["similarity"])  # 应接近0.707
    """
    try:
        # 转换为numpy数组并验证维度
        vectors = np.asarray(vectors)
        target = np.squeeze(np.asarray(target))

        # 维度验证
        if vectors.ndim == 1:
            vectors = vectors.reshape(1, -1)
        if target.ndim != 1:
            raise ValueError(f"目标向量应为1维，实际维度：{target.ndim}")
        if vectors.shape[1] != target.shape[0]:
            raise ValueError(
                f"维度不匹配：向量组{vectors.shape[1]}D，目标{target.shape[0]}D")

        # 数值稳定处理
        vectors_norm = np.linalg.norm(vectors, axis=1, keepdims=True)
        vectors = vectors / (vectors_norm + epsilon)

        target_norm = np.linalg.norm(target)
        target = target / (target_norm + epsilon)

        # 批量计算相似度 (矩阵乘法)
        similarities = np.dot(vectors, target)

        # 构建结果
        results = [
            {
                "index": idx,
                "similarity": float(sim),
                "vector": vec
            } for idx, (sim, vec) in enumerate(zip(similarities, vectors))
        ]

        # 按相似度降序排序
        return sorted(results, key=lambda x: x["similarity"], reverse=True)

    except ValueError as ve:
        print(f"输入错误: {str(ve)}")
        return []
    except Exception as e:
        print(f"计算失败: {str(e)}")
        return []


results = vector_similarity(embeddings, test)
print("\n相似度排序:")
for r in results:
    print(f"索引 {r['index']}: 相似度 {r['similarity']:.4f}")
    print(f"向量范数: {np.linalg.norm(r['vector']):.4f}")
    print("-" * 40)
