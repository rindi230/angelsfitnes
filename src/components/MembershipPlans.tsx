import { Check, Star } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const MembershipPlans = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedPlanPrice, setSelectedPlanPrice] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const plans = [
    {
      name: "Plani Bazë",
      price: "29",
      period: "muaj",
      description: "I përshtatshëm për fillestarët që duan të nisin rrugëtimin e tyre në fitnes",
      features: [
        "Akses në të gjitha pajisjet e palestrës",
        "Dollap bazë",
        "Parkim falas",
        "Monitorim online i stërvitjes"
      ],
      popular: false
    },
    {
      name: "Plani Premium",
      price: "49",
      period: "muaj",
      description: "I përshtatshëm për ata që frekuentojnë palestrën rregullisht dhe kërkojnë më shumë përfitime",
      features: [
        "Të gjitha përfitimet bazë të përfshira",
        "Klasa grupore fitnesi",
        "Konsultim personal me trajner",
        "Udhëzime ushqimore",
        "Rezervim me prioritet",
        "Ftesa për miq"
      ],
      popular: true
    },
    {
      name: "Plani Elitë",
      price: "79",
      period: "muaj",
      description: "Për ata që kërkojnë eksperiencë të plotë dhe shërbime shtesë në fitnes",
      features: [
        "Të gjitha përfitimet premium të përfshira",
        "Stërvitje personale pa kufizim",
        "Terapia me masazh",
        "Dollap VIP",
        "Ftesa të pakufizuara për miq",
        "Plan ushqimor i personalizuar",
        "Akses 24/7"
      ],
      popular: false
    }
  ];

  const handleGetStarted = (planName: string, planPrice: string) => {
    setSelectedPlan(planName);
    setSelectedPlanPrice(planPrice);
    setIsDialogOpen(true);
  };

  const sendMembershipEmail = async () => {
    try {
      const { error } = await supabase.functions.invoke('send-membership-email', {
        body: {
          customerName,
          customerEmail,
          customerPhone,
          planName: selectedPlan,
          planPrice: selectedPlanPrice,
        },
      });

      if (error) {
        console.error('Error sending membership email:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in sendMembershipEmail:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to process your membership inquiry.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await sendMembershipEmail();
      
      toast({
        title: "Inquiry Submitted Successfully!",
        description: `Thank you ${customerName}! We've received your interest in the ${selectedPlan} plan. Our team will contact you soon.`,
      });
      
      // Reset form
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your inquiry. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Planet e Anëtarësimit</h2>
          <p className="text-xl text-gray-600">
            Zgjidhni planin e përsosur për rrugëtimin tuaj të fitnesit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover-scale ${
                plan.popular ? 'border-red-500' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleGetStarted(plan.name, plan.price)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                    plan.popular
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Të gjitha anëtarësimet përfshijnë akses në pajisjet dhe ambientet tona moderne
          </p>
          <p className="text-sm text-gray-500">
            Zbatohen kushte dhe rregulla. Kontaktoni për më shumë detaje.
          </p>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Bashkohuni me planin {selectedPlan}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Ju lutemi plotësoni të dhënat tuaja për të filluar
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Emri i plotë</Label>
              <Input
                id="name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Shkruani emrin tuaj të plotë"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Shkruani email-in tuaj"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Numri i telefonit</Label>
              <Input
                id="phone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Shkruani numrin tuaj të telefonit"
                required
              />
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Plani i zgjedhur:</strong> {selectedPlan}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Çmimi:</strong> ${selectedPlanPrice}/muaj
              </p>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                Anulo
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400"
              >
                {isSubmitting ? "Duke dërguar..." : "Dërgo kërkesën"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MembershipPlans;