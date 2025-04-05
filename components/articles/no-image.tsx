import { ImageDown } from "lucide-react";

export default function NoImageArticle() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <ImageDown size={80} color={"#99a1af"} strokeWidth={2} />
      <p className="text-center text-gray-400">
        Отсутствует изображение <br />
        для статьи
      </p>
    </div>
  );
}
