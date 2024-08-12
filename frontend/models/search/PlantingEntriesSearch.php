<?php

namespace frontend\models\search;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use frontend\models\PlantingEntries;

/**
 * PlantingEntriesSearch represents the model behind the search form of `frontend\models\PlantingEntries`.
 */
class PlantingEntriesSearch extends PlantingEntries
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'variety_id', 'field_id'], 'integer'],
            [['sowing_date'], 'safe'],
            [['quantity'], 'number'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = PlantingEntries::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'variety_id' => $this->variety_id,
            'field_id' => $this->field_id,
            'sowing_date' => $this->sowing_date,
            'quantity' => $this->quantity,
        ]);

        return $dataProvider;
    }
}
