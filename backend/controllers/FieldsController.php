<?php 
namespace backend\controllers;

use yii\rest\ActiveController;
use yii\web\NotFoundHttpException;
use backend\models\Fields;
use Yii;

class FieldsController extends ActiveController
{
    public $modelClass = 'backend\models\Fields';

    // Переопределение методов, если требуется кастомизация логики
    public function actions()
    {
        $actions = parent::actions();

        // Отключение ненужных действий, если необходимо
         unset($actions['delete'], $actions['create']);

        // Кастомизация действия поиска (если нужно)
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

        return $actions;
    }

    // Пример кастомизации поиска данных (индекса)
    public function prepareDataProvider()
    {
        $searchModel = new \frontend\models\search\FieldsSearch();
        return $searchModel->search(Yii::$app->request->queryParams);
    }

    // Допустим, вы хотите добавить экшн для какого-то специального действия
    public function actionSpecial()
    {
        // Здесь может быть кастомная логика
        return ['message' => 'This is a special action!'];
    }

    // Переопределение метода создания, чтобы добавить кастомную логику
    public function actionCreate()
    {
        $model = new Fields();
        $model->load(Yii::$app->request->post(), '');

        if ($model->save()) {
            // Добавление кастомных данных в ответе или выполнение дополнительных действий
            return $model;
        } else {
            return $model->getErrors();
        }
    }

    // Переопределение метода обновления
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        $model->load(Yii::$app->request->post(), '');

        if ($model->save()) {
            return $model;
        } else {
            return $model->getErrors();
        }
    }

    // Переопределение метода удаления (например, мягкое удаление)
    public function actionDelete($id)
    {
        $model = $this->findModel($id);
        $model->delete();

        return ['status' => 'success'];
    }

    // Поиск модели по ID
    protected function findModel($id)
    {
        if (($model = Fields::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
