import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  disabled: boolean;
};

const GeneratePrompt = ({ disabled }: Props) => (
  <div className="flex flex-1 gap-2">
    <Input
      placeholder="inser DALLE propmt"
      disabled={disabled}
      name="prompt"
      type="text"
    />
    <Button disabled={disabled} type="submit">
      Generate
    </Button>
  </div>
);

export default GeneratePrompt;
