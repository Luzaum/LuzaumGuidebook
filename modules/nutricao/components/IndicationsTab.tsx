import React from 'react';

interface IndicationsTabProps {
    species: string;
    sortedFoods: any[];
}

export const IndicationsTab: React.FC<IndicationsTabProps> = ({ species, sortedFoods }) => {
    return (
        <div id="page-indicacoes">
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Guia de Alimentos ({species === 'dog' ? 'Cães' : 'Gatos'})</h1>
            </div>
            <div id="food-catalog" className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {sortedFoods.map((food, i) => {
                    let kcalDisplay = 'N/A';
                    if (food.calories > 0) {
                        if (food.unit === 'g' || food.unit === 'ml') {
                            kcalDisplay = (food.calories * 1000).toFixed(0);
                        } else {
                            kcalDisplay = `${food.calories.toFixed(0)} /unidade`;
                        }
                    }
                    const foodCatalogKey = `${food.name}-${food.calories ?? ""}-${food.unit ?? ""}-${i}`;
                    return (
                        <div key={foodCatalogKey} className="bg-muted p-4 rounded-lg border border-border">
                            <h4 className="font-bold text-foreground">{food.name}</h4>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-foreground">
                                <div className="text-center bg-card p-2 rounded"><strong>kcal/kg ou /L:</strong> {kcalDisplay}</div>
                                <div className="text-center bg-card p-2 rounded"><strong>% PB:</strong> {food.protein}</div>
                                <div className="text-center bg-card p-2 rounded"><strong>% EE:</strong> {food.fat}</div>
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">Indicação Principal:</strong> {food.indication}</p>

                            {food.alerts && food.alerts.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {food.alerts.map((alert: any, alertIndex: number) => {
                                        const alertClasses: Record<string, string> = {
                                            red: 'bg-red-100 border-l-4 border-red-500 text-red-800',
                                            yellow: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800',
                                            green: 'bg-green-100 border-l-4 border-green-500 text-green-800'
                                        };
                                        const icon: Record<string, string> = { red: '🚨', yellow: '⚠️', green: '✅' };
                                        return (
                                            <div key={`${alert.type}-${alert.text?.substring(0, 20) ?? ""}-${alertIndex}`} className={`p-3 rounded-r-md text-sm flex items-start ${alertClasses[alert.type]}`}>
                                                <span className="mr-2 text-base">{icon[alert.type]}</span>
                                                <p dangerouslySetInnerHTML={{ __html: alert.text }} />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
