import { useEffect, useRef } from "react";

export default function useMount(effect) {
  const ref = useRef(effect);
  useEffect(() => ref.current(), []);
}
