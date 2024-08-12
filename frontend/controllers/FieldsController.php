<?php

namespace frontend\controllers;

use Yii;
use frontend\models\Fields;
use frontend\models\search\FieldsSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use \stdClass;
/**
 * FieldsController implements the CRUD actions for Fields model.
 */
class FieldsController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [
                'verbs' => [
                    'class' => VerbFilter::className(),
                    'actions' => [
                        'delete' => ['POST'],
                    ],
                ],
            ]
        );
    }

    /**
     * Lists all Fields models.
     *
     * @return string
     */
    public function actionIndex()
    {		
        $searchModel = new FieldsSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);
		if ($this->request->isPjax){
			return $this->renderPartial('index', [
				'searchModel' => $searchModel,
				'dataProvider' => $dataProvider,
			]);
		}
		
		return $this->render('index', [
			'searchModel' => $searchModel,
			'dataProvider' => $dataProvider,
		]);
    }

    /**
     * Displays a single Fields model.
     * @param int $id ID
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Fields model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Fields();
		
        if ($this->request->isPost) {
			if ($model->load($this->request->post()) && $model->save()) {
                if($this->request->isAjax){
					Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
					return $model;	
				}
				return $this->redirect(['view', 'id' => $model->id]);
            }
        } else {
            $model->loadDefaultValues();
        }
		
		
		if($this->request->isAjax){
			return $this->renderAjax('create', [
				'model' => $model,
			]);
		}
		
        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Fields model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id ID
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing Fields model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $id ID
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }
	
	public function actionGet(){
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $searchModel = new FieldsSearch();
        $dataProvider = $searchModel->searchAsGeoJson(Yii::$app->request->queryParams);
        $dataProvider->pagination = false;
		$models=$dataProvider->getModels();
		$featureCollection = new stdClass;
		$featureCollection->type = "FeatureCollection";
		
		
		foreach ($models as $model){
			
			$feature = new stdClass;
			$feature->type = 'Feature';
            $feature->geometry_name ="poly";
			$feature->geometry= json_decode($model->coordinates);
			$featureCollection->features[]=$feature;
			
		}
		
		return $featureCollection;
    }

    /**
     * Finds the Fields model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $id ID
     * @return Fields the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Fields::findOne(['id' => $id])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
