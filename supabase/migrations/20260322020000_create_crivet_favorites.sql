CREATE TABLE IF NOT EXISTS "public"."crivet_favorites" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    "name" text NOT NULL,
    "input_data" jsonb NOT NULL,
    "result_data" jsonb NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."crivet_favorites" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own Crivet favorites" 
ON "public"."crivet_favorites"
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
