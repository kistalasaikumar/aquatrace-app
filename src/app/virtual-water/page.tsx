import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Droplets } from "lucide-react";

export default function VirtualWaterPage() {
  return (
    <main className="flex-grow container mx-auto p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl text-primary">Virtual Water</CardTitle>
          </div>
          <CardDescription>Understanding the hidden water in everyday products.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-3xl font-bold text-primary">The Virtual Water:</h2>
          <p className="text-lg leading-relaxed">
            The virtual water trade is the hidden flow of water in food or other commodities that are traded from one place to another.[1] Other terms for it are embedded or embodied water. The virtual water trade is the idea that virtual water is exchanged along with goods and services. This idea provides a new, amplified perspective on water problems. It balances different perspectives, basic conditions, and interests. This concept makes it possible to distinguish between global, regional, and local levels and their linkages. However, the use of virtual water estimates may offer no guidance for policymakers seeking to ensure they are meeting environmental objectives.
          </p>
          <p className="text-lg leading-relaxed">
            For example, cereal grains have been major carriers of virtual water in countries where water resources are scarce. So cereal imports can compensate for local water deficits.[2] However, low-income countries may not be able to afford such imports in the future. This could lead to food insecurity and starvation.
          </p>
          <h3 className="text-2xl font-bold text-primary/90 pt-4 border-t border-border/50">Concept</h3>
          <p className="text-lg leading-relaxed">
            The virtual water concept, also known as embodied water, was coined by John Anthony Allan (Tony Allan) in 1993. He received the Stockholm Water Prize for the concept in 2008.[3][4]
          </p>
          <p className="text-lg leading-relaxed">
            The virtual water trade is the idea that when goods and services are exchanged, so is virtual water. When a country imports one tonne of wheat instead of producing it domestically, it is saving about 1,300 cubic meters of real indigenous water. If this country is water-scarce, the water that is 'saved' can be used towards other ends. If the exporting country is water-scarce, however, it has exported 1,300 cubic meters of virtual water since the real water used to grow the wheat will no longer be available for other purposes. This has obvious strategic implications for countries that are water-constrained such as those found in the Southern African Development Community (SADC) area.[5][6][7]
          </p>
          <p className="text-lg leading-relaxed">
            Water-scarce countries like Israel discourage the export of oranges (relatively water intensive crops) precisely to prevent large quantities of water from being exported to different parts of the world.[8]
          </p>
           <p className="text-lg leading-relaxed">
            In recent years, the concept of virtual water trade has gained weight both in the scientific as well as in the political debate. The notion of the concept is ambiguous. It changes between an analytical, descriptive concept and a political induced strategy. As an analytical concept, virtual water trade represents an instrument that allows the identification and assessment of policy options not only in the scientific but also in the political discourse. As a politically induced strategy, the question if virtual water trade can be implemented in a sustainable way, whether the implementation can be managed in a social, economical, and ecological fashion, and for which countries the concept offers a meaningful option.
          </p>
           <p className="text-lg leading-relaxed">
            The data that underlie the concept of virtual water can readily be used to construct water satellite accounts, and brought into economic models of international trade such as the GTAP Computable General Equilibrium Model.[9] Such a model can be used to study the economic implications of changes in the water supply or water policy, as well as the water resource implications of economic development and trade liberalization.
          </p>
           <p className="text-lg leading-relaxed">
            In sum, virtual water trade allows a new, amplified perspective on water problems: In the framework of recent developments from a supply-oriented to demand-oriented management of water resources, it opens up new fields of governance and facilitates differentiation and balancing of different perspectives, basic conditions, and interests. Analytically, the concept enables one to distinguish between global, regional, and local levels and their linkages. This means, that water resource problems have to be solved in problems[10][11] if they cannot be successfully addressed in the local or regional watershed. Virtual water trade can thus overcome the hydro-centricity of a narrow watershed view. According to the proceedings of a 2006 conference in Frankfurt, Germany, it seems reasonable to link the new concept with the approach of integrated water resources management.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
