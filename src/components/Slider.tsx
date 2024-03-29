// File: Slider.jsx
type SliderProps = {
  text: string;
  enabled: boolean;
  handleClick: () => void;
};
export default function Slider({
  text,
  handleClick,
  enabled,
}: SliderProps) {
  return (
    <>
      <div className="grid w-full cursor-pointer grid-cols-[2fr,1fr] items-center justify-items-start gap-2">
        <label htmlFor={text}>{text + "  "}</label>
        <label className="relative cursor-pointer  ">
          <input
            onChange={handleClick}
            type="checkbox"
            value=""
            id={text}
            className="peer sr-only"
            checked={enabled}
          />
          <div
            className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] 
              after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 
              after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full
               peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600
                dark:bg-gray-700 dark:peer-focus:ring-blue-800"
          ></div>
        </label>
      </div>
    </>
  );
}
