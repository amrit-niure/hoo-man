export function response(
    success: boolean,
    message: string,
    data?: unknown,
    redirectPath?: string
  ) {
    return {
      success,
      message,
      data: data || null,
      redirectPath: redirectPath || null,
    };
  }