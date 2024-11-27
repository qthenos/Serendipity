import { Separator } from "@/components/ui/separator"
import { PersonalInfoForm } from "./personal-info-form"

export default function SettingsPersonalInfoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Personal Info</h3>
        <p className="text-sm text-muted-foreground">
          Update your identifying information. Set your birthday and preferred language.
        </p>
      </div>
      <Separator />
      <PersonalInfoForm />
    </div>
  )
}
