import { FoodCatalogView } from '../components/FoodCatalogView'

export default function NaturalFoods() {
  return (
    <FoodCatalogView
      title="Base natural, suplementos e híbrida"
      description="Visão filtrada para ingredientes naturais, suplementos e suportes enterais presentes na base GENUTRI."
      initialFoodType="natural"
    />
  )
}
