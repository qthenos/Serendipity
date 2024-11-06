import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon
} from "@radix-ui/react-icons";

import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group";

const time_frames = [
  "1D",
  "1W",
  "1M",
  "6M",
  "YTD",
  "1Y",
  "Max"
];

export function DateAggregation() {
  return (
    <ToggleGroup type="single" defaultValue={time_frames[0]}>
      {time_frames.map((time_frame) => (
        <ToggleGroupItem
          key={time_frame}
          value={time_frame}
          aria-label={`Toggle ${time_frame}`}>
          <p>{time_frame}</p>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
