#include "json.c/json.h"

void
parse__JSONGlue(const char *content, size_t content_len, const char **error_message, char **json_s)
{
	JSONValueResult result = parse__JSON(content, content_len);

	if (is_err__JSONValueResult(&result)) {
		*error_message = result.err.msg;
	} else {
		char *result_s = to_string__JSONValue(unwrap__JSONValueResult(&result));

		*json_s = result_s;
	}

	deinit__JSONValueResult(&result);
}
