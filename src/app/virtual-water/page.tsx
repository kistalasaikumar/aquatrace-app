import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";

const virtualWaterData = [
    { product: "Rice (paddy)", usa: "1,275", china: "1,321", india: "2,850", russia: "2,401", indonesia: "2,150", australia: "1,022", brazil: "3,082", japan: "1,221", mexico: "2,182", italy: "1,679", netherlands: "", worldAverage: "2,291" },
    { product: "Rice (husked)", usa: "1,656", china: "1,716", india: "3,702", russia: "3,118", indonesia: "2,793", australia: "1,327", brazil: "4,003", japan: "1,586", mexico: "2,834", italy: "2,180", netherlands: "", worldAverage: "2,975" },
    { product: "Rice (broken)", usa: "1,903", china: "1,972", india: "4,254", russia: "3,584", indonesia: "3,209", australia: "1,525", brazil: "4,600", japan: "1,822", mexico: "3,257", italy: "2,506", netherlands: "", worldAverage: "3,419" },
    { product: "Wheat", usa: "849", china: "690", india: "1,654", russia: "2,375", indonesia: "", australia: "1,588", brazil: "1,616", japan: "734", mexico: "1,066", italy: "2,421", netherlands: "619", worldAverage: "1,334" },
    { product: "Maize", usa: "489", china: "801", india: "1,937", russia: "1,397", indonesia: "1,285", australia: "744", brazil: "1,180", japan: "1,493", mexico: "1,744", italy: "530", netherlands: "408", worldAverage: "909" },
    { product: "Soybeans", usa: "1,869", china: "2,617", india: "4,124", russia: "3,933", indonesia: "2,030", australia: "2,106", brazil: "1,076", japan: "2,326", mexico: "3,177", italy: "1,506", netherlands: "", worldAverage: "1,789" },
    { product: "Sugar cane", usa: "103", china: "117", india: "159", russia: "", indonesia: "164", australia: "141", brazil: "155", japan: "120", mexico: "171", italy: "", netherlands: "", worldAverage: "175" },
    { product: "Cotton seed", usa: "2,535", china: "1,419", india: "8,264", russia: "", indonesia: "4,453", australia: "1,887", brazil: "2,777", japan: "", mexico: "2,127", italy: "", netherlands: "", worldAverage: "3,644" },
    { product: "Cotton lint", usa: "5,733", china: "3,210", india: "18,694", russia: "", indonesia: "10,072", australia: "4,268", brazil: "6,281", japan: "", mexico: "4,812", italy: "", netherlands: "", worldAverage: "8,242" },
    { product: "Barley", usa: "702", china: "848", india: "1,966", russia: "2,359", indonesia: "", australia: "1,425", brazil: "1,373", japan: "697", mexico: "2,120", italy: "1,822", netherlands: "718", worldAverage: "1,388" },
    { product: "Sorghum", usa: "782", china: "863", india: "4,053", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "1,212", italy: "582", netherlands: "", worldAverage: "2,853" },
    { product: "Coconuts", usa: "749", china: "", india: "2,255", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "1,954", italy: "", netherlands: "", worldAverage: "2,545" },
    { product: "Millet", usa: "2,143", china: "1,863", india: "3,269", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "4,534", italy: "", netherlands: "", worldAverage: "4,596" },
    { product: "Coffee (green)", usa: "4,864", china: "6,290", india: "12,180", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "28,119", italy: "", netherlands: "", worldAverage: "17,373" },
    { product: "Coffee (roasted)", usa: "5,790", china: "7,488", india: "14,500", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "33,475", italy: "", netherlands: "", worldAverage: "20,682" },
    { product: "Tea (made)", usa: "", china: "11,110", india: "7,002", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "", italy: "", netherlands: "", worldAverage: "9,205" },
    { product: "Beef", usa: "13,193", china: "12,560", india: "16,482", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "37,762", italy: "21,167", netherlands: "11,681", worldAverage: "15,497" },
    { product: "Pork", usa: "3,946", china: "2,211", india: "4,397", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "6,559", italy: "6,377", netherlands: "3,790", worldAverage: "4,856" },
    { product: "Goat meat", usa: "3,082", china: "3,994", india: "5,187", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "10,252", italy: "4,180", netherlands: "2,791", worldAverage: "4,043" },
    { product: "Sheep meat", usa: "5,977", china: "5,202", india: "6,692", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "16,878", italy: "7,572", netherlands: "5,298", worldAverage: "6,143" },
    { product: "Chicken meat", usa: "2,389", china: "3,652", india: "7,736", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "5,013", italy: "2,198", netherlands: "2,222", worldAverage: "3,918" },
    { product: "Eggs", usa: "1,510", china: "3,550", india: "7,531", russia: "", indonesia: "", australia: "", brazil: "", japan: "", mexico: "4,277", italy: "1,389", netherlands: "1,404", worldAverage: "3,340" },
    { product: "Milk", usa: "695", china: "1,000", india: "1,369", russia: "1,345", indonesia: "1,143", australia: "915", brazil: "1,001", japan: "812", mexico: "2,382", italy: "861", netherlands: "641", worldAverage: "990" },
    { product: "Milk powder", usa: "3,234", china: "4,648", india: "6,368", russia: "6,253", indonesia: "5,317", australia: "4,255", brazil: "4,654", japan: "3,774", mexico: "11,077", italy: "4,005", netherlands: "2,982", worldAverage: "4,602" },
    { product: "Cheese", usa: "3,457", china: "4,963", india: "6,793", russia: "6,671", indonesia: "5,675", australia: "4,544", brazil: "4,969", japan: "4,032", mexico: "11,805", italy: "4,278", netherlands: "3,190", worldAverage: "4,914" },
    { product: "Leather (bovine)", usa: "14,190", china: "13,513", india: "17,710", russia: "22,575", indonesia: "15,929", australia: "18,384", brazil: "18,222", japan: "11,864", mexico: "40,482", italy: "22,724", netherlands: "12,572", worldAverage: "16,656" },
];


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
            In sum, virtual water trade allows a new, amplified perspective on water problems: In the framework of recent developments from a supply-oriented to a demand-oriented management of water resources, it opens up new fields of governance and facilitates differentiation and balancing of different perspectives, basic conditions, and interests. Analytically, the concept enables one to distinguish between global, regional, and local levels and their linkages. This means, that water resource problems have to be solved in problems[10][11] if they cannot be successfully addressed in the local or regional watershed. Virtual water trade can thus overcome the hydro-centricity of a narrow watershed view. According to the proceedings of a 2006 conference in Frankfurt, Germany, it seems reasonable to link the new concept with the approach of integrated water resources management.
          </p>

          <div className="pt-8">
            <h3 className="text-2xl font-bold text-primary/90 mb-4">Virtual water content of selected products</h3>
            <div className="overflow-x-auto">
                <Table>
                    <TableCaption>Average virtual water content of some selected products for a number of selected countries (m³/ton).[15]</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">Product</TableHead>
                            <TableHead className="text-right font-bold">USA</TableHead>
                            <TableHead className="text-right font-bold">China</TableHead>
                            <TableHead className="text-right font-bold">India</TableHead>
                            <TableHead className="text-right font-bold">Russia</TableHead>
                            <TableHead className="text-right font-bold">Indonesia</TableHead>
                            <TableHead className="text-right font-bold">Australia</TableHead>
                            <TableHead className="text-right font-bold">Brazil</TableHead>
                            <TableHead className="text-right font-bold">Japan</TableHead>
                            <TableHead className="text-right font-bold">Mexico</TableHead>
                            <TableHead className="text-right font-bold">Italy</TableHead>
                            <TableHead className="text-right font-bold">Netherlands</TableHead>
                            <TableHead className="text-right font-bold">World average</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {virtualWaterData.map((item) => (
                            <TableRow key={item.product}>
                                <TableCell className="font-medium">{item.product}</TableCell>
                                <TableCell className="text-right">{item.usa}</TableCell>
                                <TableCell className="text-right">{item.china}</TableCell>
                                <TableCell className="text-right">{item.india}</TableCell>
                                <TableCell className="text-right">{item.russia}</TableCell>
                                <TableCell className="text-right">{item.indonesia}</TableCell>
                                <TableCell className="text-right">{item.australia}</TableCell>
                                <TableCell className="text-right">{item.brazil}</TableCell>
                                <TableCell className="text-right">{item.japan}</TableCell>
                                <TableCell className="text-right">{item.mexico}</TableCell>
                                <TableCell className="text-right">{item.italy}</TableCell>
                                <TableCell className="text-right">{item.netherlands}</TableCell>
                                <TableCell className="text-right font-bold">{item.worldAverage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          </div>
          <div className="space-y-6 pt-8 border-t border-border/50">
            <h3 className="text-2xl font-bold text-primary/90">How AquaTrace Calculates Your Footprint</h3>
            <p className="text-lg leading-relaxed">The calculation is a simplified model designed to give users a good estimate of their daily virtual water usage. It's broken down into three main categories based on the information you provide in the questionnaire:</p>
            <ol className="list-decimal list-inside space-y-4 text-lg">
                <li>
                    <span className="font-bold">Food Consumption:</span> This is the largest component of most people's virtual water footprint. The calculation uses a baseline value depending on your diet:
                    <ul className="list-disc list-inside ml-6 mt-2">
                        <li><span className="font-semibold">Meat Eater:</span> 600 gallons/day</li>
                        <li><span className="font-semibold">Vegetarian:</span> 400 gallons/day</li>
                        <li><span className="font-semibold">Vegan:</span> 300 gallons/day</li>
                    </ul>
                </li>
                <li>
                    <span className="font-bold">Household Water Use:</span> This part is calculated based on your daily habits at home:
                    <ul className="list-disc list-inside ml-6 mt-2">
                        <li><span className="font-semibold">Total Shower Water</span> = (Your average shower time in minutes) × (2.5 gallons per minute) × (Number of people in your household)</li>
                        <li><span className="font-semibold">Total Laundry Water</span> = (Number of laundry loads per week) × (30 gallons per load)</li>
                    </ul>
                    The <code className="bg-muted px-1.5 py-0.5 rounded">householdWater</code> is the sum of these two.
                </li>
                 <li>
                    <span className="font-bold">Outdoor Water Use:</span> This is estimated based on your outdoor watering habits:
                    <ul className="list-disc list-inside ml-6 mt-2">
                         <li><span className="font-semibold">Watering Daily:</span> Adds 150 gallons/day.</li>
                         <li><span className="font-semibold">Watering Weekly/Monthly:</span> Adds 75 gallons/day.</li>
                         <li><span className="font-semibold">Never Watering:</span> Adds 0 gallons/day.</li>
                         <li>This is also influenced by whether you have a swimming pool and how often you take baths.</li>
                    </ul>
                </li>
            </ol>
            <p className="text-lg leading-relaxed">The <span className="font-bold">Total Daily Footprint</span> is the sum of these three categories: <code className="bg-muted px-1.5 py-0.5 rounded">Food</code> + <code className="bg-muted px-1.5 py-0.5 rounded">Household</code> + <code className="bg-muted px-1.5 py-0.5 rounded">Outdoor</code>.</p>
            
            <h4 className="text-xl font-bold text-primary/80 pt-4">Why These Standard Values?</h4>
             <p className="text-lg leading-relaxed">The values used in the calculation are based on widely recognized industry averages and data from environmental studies to provide a reliable yet simplified estimate. Here's a quick breakdown:</p>
             <ul className="list-disc list-inside space-y-3 text-lg">
                <li><span className="font-semibold">Dietary Water Footprint (300-600 gallons/day):</span> These figures are derived from numerous studies on the "virtual water" content of food. It's well-documented that meat production, especially beef, is far more water-intensive than growing vegetables and grains. The numbers represent an average daily diet for each category.</li>
                <li><span className="font-semibold">Shower Water Usage (2.5 gallons/minute):</span> This is the standard flow rate for showerheads in the United States, as established by the Environmental Protection Agency (EPA). While modern low-flow models are more efficient, this value serves as a common baseline.</li>
                <li><span className="font-semibold">Laundry Water Usage (30 gallons/load):</span> This is a standard average for a conventional top-loading washing machine. High-efficiency models use less, but 30 gallons is a reasonable estimate for a typical household washing machine.</li>
                <li><span className="font-semibold">Outdoor Watering (0-150 gallons/day):</span> These are general estimates designed to capture the high water usage of activities like lawn and garden care. A daily watering schedule can consume a significant amount of water, so these figures provide a simplified way to account for that.</li>
             </ul>
             <p className="text-lg leading-relaxed">The primary goal of these standardized values is to make the calculator accessible and easy to use while still providing a meaningful and educational estimate. They give users a solid baseline to understand their water consumption and how it compares to others without needing to perform complex measurements themselves.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
