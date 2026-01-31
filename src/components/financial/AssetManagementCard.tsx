import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Package, TrendingDown, Box, Wrench, AlertTriangle, XCircle } from "lucide-react";
import { assetManagement } from "@/data/financialMockData";
import { cn } from "@/lib/utils";

const STATUS_ICONS = {
  "Em Uso": <Box className="h-4 w-4" />,
  "Em Manutenção": <Wrench className="h-4 w-4" />,
  "Danificado": <AlertTriangle className="h-4 w-4" />,
  "Abatido/Perdido": <XCircle className="h-4 w-4" />,
};

export function AssetManagementCard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryData = assetManagement.byCategory.find((c) => c.category === selectedCategory);

  return (
    <>
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Package className="h-4 w-4 text-info" />
              Gestão de Patrimônio
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {assetManagement.totalAssets} ativos
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="status" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="status">Por Estado</TabsTrigger>
              <TabsTrigger value="category">Por Categoria</TabsTrigger>
            </TabsList>

            <TabsContent value="status" className="space-y-4">
              {/* Status Chart */}
              <div className="h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetManagement.byStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={65}
                      paddingAngle={2}
                      dataKey="count"
                    >
                      {assetManagement.byStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number, name: string) => [
                        `${value} ativos`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Status List */}
              <div className="grid grid-cols-2 gap-2">
                {assetManagement.byStatus.map((status) => (
                  <div
                    key={status.status}
                    className="flex items-center justify-between p-2 bg-muted/30 rounded-lg text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: status.color }}
                      />
                      <span className="text-xs truncate">{status.status}</span>
                    </div>
                    <span className="font-medium text-xs">{status.count}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="category" className="space-y-3">
              {assetManagement.byCategory.map((category) => (
                <div
                  key={category.category}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedCategory(category.category)}
                >
                  <div>
                    <p className="font-medium text-sm">{category.category}</p>
                    <p className="text-xs text-muted-foreground">
                      {category.count} itens
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      €{(category.value / 1000000).toFixed(2)}M
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          {/* Summary */}
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Valor Total</span>
              <span className="font-bold">€{(assetManagement.totalValue / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingDown className="h-3 w-3" />
                Depreciação Anual
              </div>
              <span className="font-medium text-warning">
                -€{(assetManagement.depreciationYear / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Details Modal */}
      <Dialog open={selectedCategory !== null} onOpenChange={() => setSelectedCategory(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedCategory}</DialogTitle>
            <DialogDescription>Detalhes da categoria de ativos</DialogDescription>
          </DialogHeader>

          {categoryData && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Quantidade</p>
                  <p className="text-2xl font-bold">{categoryData.count}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="text-2xl font-bold">
                    €{(categoryData.value / 1000000).toFixed(2)}M
                  </p>
                </div>
              </div>

              <div className="p-4 bg-info/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Valor Médio por Ativo</p>
                <p className="text-xl font-bold">
                  €{(categoryData.value / categoryData.count).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
              </div>

              {/* Recent Movements for this category */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Movimentações Recentes</h4>
                {assetManagement.recentMovements.slice(0, 3).map((movement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted/30 rounded-lg text-sm"
                  >
                    <div>
                      <p className="font-medium truncate max-w-[180px]">{movement.asset}</p>
                      <p className="text-xs text-muted-foreground">{movement.action}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {movement.date}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
