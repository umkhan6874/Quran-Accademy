package com.example.ui.screens

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.UserRole
import com.example.ui.MainViewModel
import com.example.ui.components.FreeBadge
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OnboardingScreen(
    viewModel: MainViewModel,
    onFinish: () -> Unit,
    onSkip: () -> Unit
) {
    var step by remember { mutableStateOf(1) }
    var selectedRole by remember { mutableStateOf(UserRole.STUDENT) }
    var selectedSubject by remember { mutableStateOf("Noorani Qaida") }
    var selectedLevel by remember { mutableStateOf("Beginner (Starting fresh)") }
    var dailyGoalMinutes by remember { mutableStateOf(20) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Step $step of 4",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold
                    )
                },
                navigationIcon = {
                    if (step > 1) {
                        IconButton(onClick = { step -= 1 }) {
                            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                        }
                    }
                },
                actions = {
                    TextButton(onClick = onSkip, modifier = Modifier.testTag("onboarding_skip_btn")) {
                        Text("Skip")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        },
        bottomBar = {
            Surface(
                color = MaterialTheme.colorScheme.surface,
                tonalElevation = 6.dp,
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp)
                        .navigationBarsPadding(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    LinearProgressIndicator(
                        progress = { step / 4f },
                        modifier = Modifier
                            .weight(1f)
                            .height(8.dp)
                            .clip(RoundedCornerShape(4.dp)),
                        color = EmeraldPrimary,
                        trackColor = EmeraldContainer
                    )
                    Spacer(modifier = Modifier.width(16.dp))
                    Button(
                        onClick = {
                            if (step < 4) {
                                step += 1
                            } else {
                                viewModel.completeOnboarding(selectedRole, selectedLevel, dailyGoalMinutes)
                                onFinish()
                            }
                        },
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = EmeraldPrimary),
                        modifier = Modifier.testTag("onboarding_next_btn")
                    ) {
                        Text(if (step == 4) "Start Learning" else "Continue")
                        Spacer(modifier = Modifier.width(4.dp))
                        Icon(Icons.AutoMirrored.Filled.ArrowForward, contentDescription = null, modifier = Modifier.size(16.dp))
                    }
                }
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            when (step) {
                1 -> {
                    // Step 1: Who are you?
                    Text(
                        text = "Who are you?",
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onBackground
                    )
                    Text(
                        text = "Select your role so we can personalize your Quran learning environment.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    RoleSelectCard(
                        title = "Student",
                        subtitle = "I want to learn Noorani Qaida, Tajweed, or memorize the Quran.",
                        icon = Icons.Default.School,
                        isSelected = selectedRole == UserRole.STUDENT,
                        onClick = { selectedRole = UserRole.STUDENT }
                    )
                    RoleSelectCard(
                        title = "Parent",
                        subtitle = "I want to monitor my children's learning, attendance & homework.",
                        icon = Icons.Default.FamilyRestroom,
                        isSelected = selectedRole == UserRole.PARENT,
                        onClick = { selectedRole = UserRole.PARENT }
                    )
                    RoleSelectCard(
                        title = "Quran Teacher / Tutor",
                        subtitle = "I am a qualified Quran tutor who wants to guide students.",
                        icon = Icons.Default.CoPresent,
                        isSelected = selectedRole == UserRole.TEACHER,
                        onClick = { selectedRole = UserRole.TEACHER }
                    )
                }
                2 -> {
                    // Step 2: What do you want to learn?
                    Text(
                        text = "What is your main goal?",
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Pick the learning track you'd like to focus on first:",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    val courses = listOf(
                        "Noorani Qaida" to "Arabic alphabet, Harakat, and foundational phonetics",
                        "Nazra (Quran Reading)" to "Fluency in reciting from the Holy Mushaf",
                        "Tajweed Rules" to "Makharij, Noon Saakin, Qalqalah, and melodic rules",
                        "Hifz (Memorization)" to "Systematic memorization with repetition counter",
                        "Tafsir & Meaning" to "Understanding the messages and wisdom of Allah's words"
                    )

                    LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        items(courses.size) { idx ->
                            val (title, desc) = courses[idx]
                            OptionCard(
                                title = title,
                                subtitle = desc,
                                isSelected = selectedSubject == title,
                                onClick = { selectedSubject = title }
                            )
                        }
                    }
                }
                3 -> {
                    // Step 3: Current level
                    Text(
                        text = "What is your current level?",
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Don't worry if you are just starting—Quran Academy is designed for pure beginners!",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    val levels = listOf(
                        "Beginner (Starting fresh)" to "Cannot read Arabic letters yet",
                        "Letters recognized" to "Know the alphabet but struggle with vowels/connecting",
                        "Intermediate reader" to "Can read slowly with basic rules",
                        "Fluent with Tajweed" to "Comfortable reader wanting memorization or Ijazah"
                    )

                    levels.forEach { (lvl, desc) ->
                        OptionCard(
                            title = lvl,
                            subtitle = desc,
                            isSelected = selectedLevel == lvl,
                            onClick = { selectedLevel = lvl }
                        )
                    }
                }
                4 -> {
                    // Step 4: Daily learning goal
                    Text(
                        text = "Set your daily goal",
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Even 10-15 minutes of regular Quran engagement produces tremendous barakah.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    val goals = listOf(
                        10 to "Casual (10 mins/day) • Great for young kids",
                        20 to "Balanced (20 mins/day) • Recommended pace",
                        30 to "Dedicated (30 mins/day) • Accelerated progress",
                        45 to "Intensive (45 mins/day) • Active Hifz goal"
                    )

                    goals.forEach { (mins, desc) ->
                        OptionCard(
                            title = "$mins Minutes Daily",
                            subtitle = desc,
                            isSelected = dailyGoalMinutes == mins,
                            onClick = { dailyGoalMinutes = mins }
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))
                    FreeBadge(modifier = Modifier.align(Alignment.CenterHorizontally))
                }
            }
        }
    }
}

@Composable
private fun RoleSelectCard(
    title: String,
    subtitle: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .testTag("role_select_${title.lowercase()}"),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isSelected) EmeraldContainer else MaterialTheme.colorScheme.surface
        ),
        border = if (isSelected) androidx.compose.foundation.BorderStroke(2.dp, EmeraldPrimary) else null,
        elevation = CardDefaults.cardElevation(defaultElevation = if (isSelected) 4.dp else 1.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape)
                    .background(if (isSelected) EmeraldPrimary else MaterialTheme.colorScheme.surfaceVariant),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.size(26.dp)
                )
            }
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = if (isSelected) OnEmeraldContainer else MaterialTheme.colorScheme.onSurface
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = subtitle,
                    style = MaterialTheme.typography.bodySmall,
                    color = if (isSelected) OnEmeraldContainer.copy(alpha = 0.85f) else MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            RadioButton(
                selected = isSelected,
                onClick = onClick,
                colors = RadioButtonDefaults.colors(selectedColor = EmeraldPrimary)
            )
        }
    }
}

@Composable
private fun OptionCard(
    title: String,
    subtitle: String,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isSelected) EmeraldContainer else MaterialTheme.colorScheme.surface
        ),
        border = if (isSelected) androidx.compose.foundation.BorderStroke(2.dp, EmeraldPrimary) else null,
        elevation = CardDefaults.cardElevation(defaultElevation = if (isSelected) 3.dp else 1.dp)
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = if (isSelected) OnEmeraldContainer else MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = subtitle,
                    style = MaterialTheme.typography.bodySmall,
                    color = if (isSelected) OnEmeraldContainer.copy(alpha = 0.8f) else MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            RadioButton(
                selected = isSelected,
                onClick = onClick,
                colors = RadioButtonDefaults.colors(selectedColor = EmeraldPrimary)
            )
        }
    }
}
