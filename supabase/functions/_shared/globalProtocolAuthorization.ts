type AuthenticatedUser = {
  id: string;
  email?: string;
  email_confirmed_at?: string | null;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
};

export function hasTrustedGlobalPermission(user: AuthenticatedUser, ids: string[] = [], emails: string[] = []): boolean {
  const metadata = user.app_metadata || {};
  const enabled = (value: unknown) => value === true || value === 1 ||
    (typeof value === 'string' && ['true', '1', 'yes'].includes(value.trim().toLowerCase()));
  return ['is_admin', 'global_protocol_publisher', 'global_content_admin'].some((key) => enabled(metadata[key])) ||
    String(metadata.role || '').trim().toLowerCase() === 'admin' || ids.includes(user.id) ||
    Boolean(user.email_confirmed_at && user.email && emails.includes(user.email.trim().toLowerCase()));
}

export function canDeleteGlobalProtocol(input: {
  user: AuthenticatedUser;
  sourceClinicRole?: string;
  publishedByUserId?: string | null;
  allowedIds?: string[];
  allowedEmails?: string[];
}): boolean {
  return hasTrustedGlobalPermission(input.user, input.allowedIds, input.allowedEmails) ||
    ['owner', 'admin'].includes((input.sourceClinicRole || '').trim().toLowerCase()) ||
    input.publishedByUserId === input.user.id;
}
