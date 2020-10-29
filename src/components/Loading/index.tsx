import React from "react";
import Lottie from "react-lottie";

import { getLottieDefaultOptions } from "settings/lottie";
import animationData from "assets/lotties/loading.json";

const lottieOptions = getLottieDefaultOptions(animationData);

const Loading: React.FC = () => <Lottie options={lottieOptions} />;

export default Loading;
