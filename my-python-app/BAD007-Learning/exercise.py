import numpy as np
from scipy.stats  import mode
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report


class KNNClassifier:

    def __init__(self, X_train, y_train, n_neighbors = 3):
        self.n_neighbors = n_neighbors
        self._X_train = X_train
        self._y_train = y_train

    """calculate the euclidean distance here"""
    def euclidean_dist(self, point_1, point_2):
        sum = 0

        for i in range(len(point_1)):
            sum += (point_1[i] - point_2[i]) ** 2 

        return np.sqrt(sum)

    """accept multiple inputs here and predict one by one with predict_single()"""
    def predict(self, X_test_array):
        result = []

        for i in range(len(X_test_array)):
            result.append(self.predict_single(X_test_array[i]))

        return result

    """predict single input here"""
    def predict_single(self, input_data_single):
        distance = []

        # [ 
        #  [0.003, 0],
        #  [0.0005, 1],
        #  [0.0006, 1],
        #   ..
        # ]
        for i in range(len(self._X_train)):
            distance.append([self.euclidean_dist(input_data_single, self._X_train[i]), self._y_train[i]])

        distance.sort(key=lambda data: data[0])

        result_set = []

        for i in range(self.n_neighbors):
            result_set.append(distance[i][1])
        
        print(result_set)
        print(mode(result_set).mode)

        return mode(result_set).mode


iris = load_iris()
X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(X_train.shape)    # (120, 4)
print(X_test.shape)     # (30, 4)
print(y_train.shape)    # (120,)
print(y_test.shape)     # (30,)

iris_knn_classifier = KNNClassifier(X_train, y_train, 5)
y_pred = iris_knn_classifier.predict(X_test)
print(classification_report(y_test, y_pred, target_names=[
      'Iris-Setosa', 'Iris-Versicolour', 'Iris-Virginica']))