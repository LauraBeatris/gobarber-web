import { useCallback } from "react";
import { useCopyToClipboard } from "react-use";
import { useTranslation } from "react-i18next";
import noop from "lodash.noop";

import { useToastsDispatch } from "contexts/toasts/ToastsContext";

import { UseShareResult } from "./types";

/**
 * Exposes the Open Graph Share functionality. If the share is not supported, it will simply
 * copy to the clipboard and show a success toast instead.
 */
const useShare = (): UseShareResult => {
  const [, copyToClipboard] = useCopyToClipboard();
  const { addToast } = useToastsDispatch();
  const [t] = useTranslation();

  const share = useCallback(({
    title,
    text,
    url,
  }: ShareData) => {
    if (navigator?.share) {
      navigator.share({
        title,
        text,
        url,
      })
        .catch(noop);

      return;
    }

    if (!url) {
      return;
    }

    copyToClipboard(url);

    addToast({
      title: t("actions.copied_to_clipboard"),
      type: "success",
    });
  }, [
    copyToClipboard,
    addToast,
    t,
  ]);

  return share;
};

export default useShare;
