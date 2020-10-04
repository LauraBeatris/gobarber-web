import { Options } from "react-lottie";

export const getLottieDefaultOptions = (animationData: unknown): Options => ({
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
});
